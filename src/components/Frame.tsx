import styles from "./Frame.module.css"

const FRAME_COLOR = "#F6EEE3";
const FRAME_Z_INDEX = 10000;

const cornerStyle = {
  height: "24px",
  width: "24px",
  transform: "rotate(45deg)",
  position: "fixed" as const,
  background: FRAME_COLOR,
  zIndex: FRAME_Z_INDEX,
};

const horizontalBarStyle = {
  height: "1rem",
  position: "fixed" as const,
  top: "0",
  width: "100%",
  background: FRAME_COLOR,
  zIndex: FRAME_Z_INDEX,
};

const verticalBarStyle = {
  height: "100%",
  position: "fixed" as const,
  top: "0",
  width: "1rem",
  background: FRAME_COLOR,
  zIndex: FRAME_Z_INDEX,
};

function Corner({ top, bottom, left, right }: {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}) {
  return (
    <div
      style={{
        ...cornerStyle,
        top,
        bottom,
        left,
        right,
      }}
    />
  );
}

function HorizontalBar({ top, bottom }: {
  top?: string;
  bottom?: string;
}) {
  return (
    <div
      style={{
        ...horizontalBarStyle,
        top,
        bottom,
      }}
    />
  );
}

function VerticalBar({ left, right }: {
  left?: string;
  right?: string;
}) {
  return (
    <div
      style={{
        ...verticalBarStyle,
        left,
        right,
      }}
    />
  );
}

function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles['page-content']}>
        {children}
      </div>

      <div className={styles['frame-overlay']} />

      <Corner top="0" left="0" />
      <Corner top="0" right="0" />
      <Corner bottom="0" left="0" />
      <Corner bottom="0" right="0" />

      <HorizontalBar top="0" />
      <VerticalBar left="0" />


      <HorizontalBar bottom="0" />
      <VerticalBar right="0" />
    </>
  );
}

export default AppFrame;