// 상세 모달
// 타이틀 이미지 행사명 주소 기간


function FestivalDetail() {
  return (
    <div className="container">
      <div className="detail-card">
        <p>행사 상세 정보</p>
        <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
        <p className="card-title">{item.title}</p>
        <p className="card-period">시작일 : {dateFomatter.withHyphenYMD(item.eventstartdate)}</p>
        <p className="card-period">종료일 : {dateFomatter.withHyphenYMD(item.eventenddate)}</p>
      </div>
    </div>
  )
};

export default FestivalDetail;