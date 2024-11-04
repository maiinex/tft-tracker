import TestWithProps from "./TestWithProps";
function TestFE() {
  return (
    <div className="frontend">{<TestWithProps rankName={"Silver III"} />}</div>
  );
}
export default TestFE;
