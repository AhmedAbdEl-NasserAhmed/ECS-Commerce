const AnalysisCard = (props) => {
  return (
    <div
      className={`bg-white border-2 border-slate-100 rounded-2xl ${
        props.className || ""
      }`}
    >
      <header className="p-6 flex items-center justify-between">
        <h4 className="h2 text-4xl font-bold">{props.title}</h4>
        {props.applyDateFilter && <div>DATE FILTER</div>}
      </header>
      <hr />
      <div className="p-6" style={{ overflowX: "scroll" }}>
        {props.children}
      </div>
    </div>
  );
};

export default AnalysisCard;
