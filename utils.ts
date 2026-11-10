const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;

export default function getCreateTimeDisplay(time: number): string {
    const current = Date.now();
    const gap = current - time;

    // Nếu thời gian trôi qua chưa tới 1 phút
    if (gap < ONE_MINUTE) {
        return "Vài giây trước";
    }
    
    // Nếu thời gian trôi qua chưa tới 1 giờ -> Hiển thị phút
    if (gap < ONE_HOUR) {
        const gapMinute = Math.floor(gap / ONE_MINUTE);
        return `${gapMinute} phút trước`;
    }
    
    // Nếu thời gian trôi qua chưa tới 1 ngày -> Hiển thị giờ
    if (gap < ONE_DAY) {
        const gapHour = Math.floor(gap / ONE_HOUR);
        return `${gapHour} giờ trước`;
    }
    
    // Nếu thời gian trôi qua chưa tới 1 tháng -> Hiển thị ngày
    if (gap < ONE_MONTH) {
        const gapDay = Math.floor(gap / ONE_DAY);
        return `${gapDay} ngày trước`;
    }
    
    // Nếu thời gian trôi qua chưa tới 1 năm -> Hiển thị tháng
    if (gap < ONE_YEAR) {
        const gapMonth = Math.floor(gap / ONE_MONTH);
        return `${gapMonth} tháng trước`;
    }
    
    // Nếu lớn hơn 1 năm -> Hiển thị năm
    const gapYear = Math.floor(gap / ONE_YEAR);
    return `${gapYear} năm trước`;
}