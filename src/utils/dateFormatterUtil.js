export const dateFormatter = {
  /**
   * 스트링 타입의 날짜(YYYYMMDD이상)를 `YYYY-MM-DD`로 포맷해서 반환
   * @param {string} strDate 
   * @returns {string} YYYY-MM-DD format
   */
  withHyphenYMD: (strDate) => {
    return `${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`
  },
  /**
   * Date객체를 받아 `YYYMMDD` 포맷으로 format
   * @param {Date} date 
   * @returns {string} `YYYMMDD` 포맷
   */
  formatDateToYMD: (date) => {
    return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, 0)}${(date.getDate()).toString().padStart(2, 0)}`
  }
}
