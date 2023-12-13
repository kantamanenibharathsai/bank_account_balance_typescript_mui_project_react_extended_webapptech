const bankAccountStyles = {
  bankAccContainer: {
    width: "100%",
    // minHeight: "100vh",
    boxSizing: "border-box",
  },

  bankAccChildContainer: {
    width: "90%",
    minHeight: "100vh",
    // border: "2px solid red",
    margin: "auto",
    paddingTop: "130px",
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    boxSizing: "border-box",
  },

  navContainer: {
    width: "100%",
    // border: "2px solid green",
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 30px",
    alignItems: "center",
  },

  welcomeBackHeading: {
    // font: [font-style] [font-variant] [font-weight] [font-size]/[line-height] [font-family];
    font: "normal normal 400 24px Roboto",
  },

  navLogo: {
    width: "70px",
    height: "70px",
  },

  navInputsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  navInput: {
    outline: "none",
    cursor: "pointer",
    font: "normal normal 400 17px Roboto",
    color: "#f3f3f3",
    borderRadius: "40px",
    backgroundColor: "white",
    width: "110px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    border: "none",
  },

  arrowBtn: {
    outline: "none",
    cursor: "pointer",
    border: "none",
    padding: 0,
  },

  arrowIcon: {
    width: "30px",
    color: "black !important",
  },

  balanceContainer: {
    display: "flex",
    alignItems: "center",
    // border: "2px solid green",
    justifyContent: "space-between",
    width: "88%",
    alignSelf: "center",
    margin: "auto",
  },

  curentBalanceContainer: {
    // border: "2px solid green",
  },

  currentBalanceHeading: {
    font: "normal normal 400 23px Roboto",
  },

  currentBalanceDate: {
    font: "normal normal 400 16px Roboto",
    color: "#B2B2B2",
  },

  currentBalanceNumber: {
    font: "normal normal 400 40px Roboto",
    color: "#474747",
  },

  transactionsBodyContainer: {
    // border: "2px solid green",
    width: "88%",
    alignSelf: "center",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: "auto",
  },

  transactionsBodyLeftContainer: {
    display: "flex",
    alignItems: "flex-start",
    // border: "2px solid green",
    justifyContent: "space-between",
    width: "66%",
  },

  transactionsContainer: {
    backgroundColor: "white",
    borderRadius: "15px",
    // border: "2px solid yellow",
    overflow: "auto",
    height: "585px",
    width: "100%",
  },

  rightContainer: {
    width: "30%",
    // border: "2px solid black",
  },

  gridContainer: {
    gridGap: "30px",
  },

  transferMoneyPaper: {
    p: 4,

    background: "#ffbf04",
    borderRadius: "10px",
  },
  transferToInput: {
    height: "3.5ch",
    backgroundColor: "#ffd967",
    borderRadius: "10px",
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },

  transferMoneyTxt: {
    mb: 1.5,
    font: "normal normal 400 23px Roboto",
  },

  formArrowContainer: {
    display: "flex",
    alignItems: "flex-start",
    // border: "2px solid green",
  },

  form: {
    m: 1,
    width: "15ch",
    // border: "2px solid red",
  },

  arrowIconBtn: {
    outline: "none",
    cursor: "pointer",
    background: "#ffffff",
    padding: "0px 0px",
    borderRadius: "6px",
    marginTop: "8px",
    height: "30px",
    width: "10px",
  },

  arrowIcon1: {
    width: "21px",
    color: "black",
  },

  RequestLoanPaper: {
    p: 4,

    background: "#4EBC7B",
    borderRadius: "10px",
  },

  loanInput: {
    background: "#AAE1A9",
  },

  closeAccountPaper: {
    p: 4,

    backgroundColor: "#F2405B",
    borderRadius: "10px",
  },

  closeInputs: {
    background: "#FFBF04",
  },

  amountsLogoutTimeContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "88%",
    margin: "auto",
    // border: "2px solid green",
    alignItems: "center",
  },

  totalAmountsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "66%",
    // border: "2px solid green",
  },

  amount: {
    font: "normal normal 400 15px Roboto",
    color: "#A7A7A7",
  },

  spanEl: {
    font: "normal normal 400 22px Roboto",
    color: "#A7D8AA",
    ml: 1,
  },

  logoutTimeContainer: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-end",
  },

  logoutTimeText: {
    font: "normal normal 400 15px Roboto",
    color: "#A7A7A7",
  },

  showingDetailsContainer: {
    // border: "3px solid red",
    display: "flex",
    flexDirection: "column",
    gap: "60px",
  },

  credentialsErrorMsg: {
    font: "normal normal 400 15px Roboto",
    color: "#a83240",
  },
};

export default bankAccountStyles;
