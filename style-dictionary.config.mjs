import StyleDictionary from 'style-dictionary';

// ── 커스텀 Dart 포맷: AppColors 클래스 ──
StyleDictionary.registerFormat({
  name: 'flutter/colors.dart',
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens
      .filter(token => token.type === 'color')
      .map(token => {
        const hex = token.value.replace('#', '').toUpperCase();
        const name = token.path.slice(1).join('_').replace(/-/g, '_');
        // camelCase 변환
        const camelName = name.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
        return `  static const ${camelName} = Color(0xFF${hex});`;
      });
    return [
      "// 이 파일은 Style Dictionary가 자동 생성합니다. 직접 수정하지 마세요.",
      "// 원본: tokens/*.json",
      "// 생성: npm run build:tokens",
      "",
      "import 'dart:ui';",
      "",
      "class AppColors {",
      ...lines,
      "}",
      "",
    ].join('\n');
  },
});

// ── 커스텀 Dart 포맷: AppSpacing, AppRadius 클래스 ──
StyleDictionary.registerFormat({
  name: 'flutter/dimensions.dart',
  format: ({ dictionary }) => {
    const spacingLines = dictionary.allTokens
      .filter(token => token.path[0] === 'spacing')
      .map(token => {
        const name = token.path.slice(1).join('_').replace(/-/g, '_');
        const camelName = name.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
        return `  static const double ${camelName} = ${token.value};`;
      });

    const radiusLines = dictionary.allTokens
      .filter(token => token.path[0] === 'radius')
      .map(token => {
        const name = token.path.slice(1).join('_').replace(/-/g, '_');
        const camelName = name.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
        return `  static const double ${camelName} = ${token.value};`;
      });

    const fontSizeLines = dictionary.allTokens
      .filter(token => token.path[0] === 'font' && token.path[1] === 'size')
      .map(token => {
        const name = token.path.slice(2).join('_').replace(/-/g, '_');
        const camelName = name.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
        return `  static const double ${camelName} = ${token.value};`;
      });

    return [
      "// 이 파일은 Style Dictionary가 자동 생성합니다. 직접 수정하지 마세요.",
      "// 원본: tokens/*.json",
      "// 생성: npm run build:tokens",
      "",
      "class AppSpacing {",
      ...spacingLines,
      "}",
      "",
      "class AppRadius {",
      ...radiusLines,
      "}",
      "",
      "class AppTypography {",
      ...fontSizeLines,
      "}",
      "",
    ].join('\n');
  },
});

// ── 빌드 설정 ──
const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    // CSS 출력 (React용)
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: '_generated.css',
          format: 'css/variables',
          options: {
            outputReferences: true,  // var(--xxx) 참조 구조 유지
          },
        },
      ],
    },
    // Dart 출력 (Flutter용) — Flutter 프로젝트가 있을 때만 사용
    flutter: {
      transformGroup: 'js',
      buildPath: 'flutter_output/',
      files: [
        {
          destination: 'app_colors.dart',
          format: 'flutter/colors.dart',
          filter: (token) => token.type === 'color',
        },
        {
          destination: 'app_dimensions.dart',
          format: 'flutter/dimensions.dart',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('\n✅ Style Dictionary 빌드 완료');
console.log('   CSS → src/tokens/_generated.css');
console.log('   Dart → flutter_output/app_colors.dart, app_dimensions.dart');
