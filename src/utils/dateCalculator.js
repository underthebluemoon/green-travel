export const dateCalculator = {

  /**
   * 현재 시간 기준 timestamp만큼 과거의 날짜를 계산하여 Date 객체 반환
   * @param {number} timestamp 
   * @returns {date} 계산된 시간 반환
   */
  getPastDate: (timestamp) => {
    const now = new Date();
    return new Date(now - timestamp);
  }
}


