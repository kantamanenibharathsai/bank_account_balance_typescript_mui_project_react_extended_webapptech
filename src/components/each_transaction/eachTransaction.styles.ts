const eachTransactionStyles = {
  transactionListItem: {
    height: "75px",
    width: "100%",
    borderBottom: "1px solid grey",
    backgroundColor: "transparent",
  },

  transactionListItemChildContainer: {
    width: "90%",
    height: "74px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionTypeButton: {
    outline: "none",
    cursor: "pointer",
    border: "none",
    padding: 0,
  },

  transactionTypeDateContainer: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  transactionCountTypeText: {
    backgroundColor: "#EE385C",
    color: "white",
    font: "normal normal 400 14px Roboto",
    borderRadius: "40px",
    padding: "2px 9px",
  },

  depositBackgroundColor: {
    backgroundColor: "#58C177",
  },

  transactionDate: {
    font: "normal normal 400 15px Roboto",
    color: "#A7A7A7",
  },

  transactionAmount: {
    font: "normal normal 400 22px Roboto",
    color: "#A7A7A7",
  },
};

export default eachTransactionStyles;
