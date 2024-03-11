import dayjs from 'dayjs';

export const DateHelper = {
  formatDate: (date: string | Date, format: string) => {
    if (!date) {
      return "-";
    }
    return dayjs(date).format(format);
  },
  toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h` : ''} ${minutes > 0 ? `${minutes}m` : ""}`;
  },
  getAge(birthday: Date | string, deathDay?: Date | string | null) {
    var today = deathDay ? new Date(deathDay) : new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  },
};
