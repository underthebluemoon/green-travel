function FestivalDetail() {
  return (
    <div className="container">
      <div className="detail-card">
        <div className="detail-img"></div>
        <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
        <p className="card-title">{item.title}</p>
        <p className="card-period">시작일 : {dateFomatter.withHyphenYMD(item.eventstartdate)}</p>
        <p className="card-period">종료일 : {dateFomatter.withHyphenYMD(item.eventenddate)}</p>
      </div>
    </div>
  )
};

export default FestivalDetail;