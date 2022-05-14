export default function Icon({ children, onclick }) {
  return (
    <div className="a1" onClick={onclick}>
      {children}
    </div>
  );
}

const StyledIcon = {
 
  // cursor: "pointer",
  // svg: {
  //   width: "1.5rem",
  //   height: "1.5rem",
  // },
  // backgroundColor: "gold",
  // "&:hover": {
  //   backgroundColor: "#560a02",
  //   cursor: "pointer",
  //   color: "gold",
  // },
};
