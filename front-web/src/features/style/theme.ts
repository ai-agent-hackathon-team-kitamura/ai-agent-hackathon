// src/features/design-system/theme.ts
import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  // CSS カスタムプロパティをどこに適用するか
  cssVarsRoot: ":where(:root, :host)",

  // トークンのプリフィックス
  cssVarsPrefix: "ck",

  // グローバル CSS（リセットやベーススタイル）
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    "*, *::before, *::after": {
      boxSizing: "inherit",
    },
  },

  // デザインシステムの中核となるテーマ設定
  theme: {
    // ブレイクポイント
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    // デザイントークン（色・スペーシングなど）
    tokens: {
      colors: {
        // 「brand」はプロダクト固有のカラーパレット名
        brand: {
          50: { value: "#f0e7ff" },
          100: { value: "#d9c2ff" },
          200: { value: "#c29bff" },
          300: { value: "#ab74ff" },
          400: { value: "#943cff" },
          500: { value: "#7e05ff" },
          600: { value: "#6600cc" },
          700: { value: "#4d0099" },
          800: { value: "#330066" },
          900: { value: "#1a0033" },
        },
      },
    },

    // セマンティックトークン（ブランドカラーを semantic name でマップ）
    semanticTokens: {
      colors: {
        primary: { value: "{colors.brand.500}" },
        background: { value: "{colors.cyan.50}" },
        text: { value: "{colors.gray.900}" },
      },
    },
  },

  // メディアクエリやコンテナクエリの条件名
  conditions: {
    mobile: "@media(max-width: 767px)",
    tablet: "@media(min-width: 768px) and (max-width:1023px)",
    desktop: "@media(min-width: 1024px)",
  },

  // トークンのみを使わせたい場合の厳格モード
  // 多分falseにする気がする
  strictTokens: true,
});

export const system = createSystem(defaultConfig, config);
