import { Button, ConfigProvider } from "antd";
import { ReactNode } from "react";

const colors = {
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  neutral: "#737373",
  stone: "#78716c",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};

export type MyButtonColors = keyof typeof colors;

type Props = {
  children: ReactNode;
  color: MyButtonColors;
  onClick?: () => void;
};

const MyButton = ({ children, color, onClick }: Props) => {
  const getColor = (): string => {
    return colors[color] || ""; // Return the color or an empty string if not found
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: getColor(),
        },
      }}
    >
      <Button type="primary" size="middle" disabled={false} onClick={onClick}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default MyButton;
