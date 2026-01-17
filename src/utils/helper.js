export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const getInitials = (fullName) => {
    if (!fullName) return "";
    
    const names = fullName.split(' ');
    let initials = " ";
    for(let i = 0; i < Math.min(names.length, 2); i++) {
        initials += names[i][0].toUpperCase();
    }
    // if (names.length > 1) {
    //     initials += names[names.length - 1].charAt(0).toUpperCase();
    // }
    return initials;
};

export const addThousandSeparators = (number) => {
    if(number==null||isNaN(number)) return "";
    const [integerPart, fractionalPart]=number.toString().split(".");
    const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData=(data=[])=>{
    const chartData=data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }))
    return chartData;
}