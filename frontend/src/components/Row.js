import Cell from "./Cell";

const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function Row(props) {
  const Items = cells.map((e) => (
    <Cell key={props.count + e} data={props.rowData[e - 1]} />
  ));
  return (
    <div
      className="row "
    >
      {Items}
    </div>
  );
}

export default Row;
