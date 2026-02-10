import styles from "./Frame.module.css"

const FRAME_COLOR = "#F6EEE3";

function Corner({ top, bottom, left, right }: {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}) {
  return (
    <div
      className={styles.corner}
      style={{
        background: FRAME_COLOR,
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
      className={styles['horizontal-bar']}
      style={{
        background: FRAME_COLOR,
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
      className={styles['vertical-bar']}
      style={{
        background: FRAME_COLOR,
        left,
        right,
        top: 0,
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