export default function Icon({ children }) {
  return (
    <div style={StyledIcon} className="a1">
      {children}
    </div>
  );
}

const StyledIcon = {
  height: "4rem",
  width: "4rem",
  background: " ${(props) => props.background}",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4rem",
  color: "#560a02",
  // cursor: "pointer",
  svg: {
    width: "1.5rem",
    height: "1.5rem",
  },
  backgroundColor: "gold",

};
