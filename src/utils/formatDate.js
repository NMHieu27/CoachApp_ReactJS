import { format } from 'date-fns';
const formatDate = {
    fFullDate(value) {
        return format(new Date(value), 'yyyy-MM-dd');
    },
    fFullDateDDFirst(value) {
        return format(new Date(value), 'dd-MM-yyyy');
    },
};
export default formatDate;
