import React from "react";
import { Box, Typography } from "@mui/material";
import eachTransactionStyles from "./eachTransaction.styles";
import { EachTransactionObj, MyUserObject } from "../../data/usersData";

interface MyProps {
  eachTransaction: EachTransactionObj;
  loginUser: MyUserObject;
}

const EachTransaction: React.FC<MyProps> = ({ eachTransaction, loginUser }) => {
  const formatDateToRequiredFormat = (currentDate: Date) => {
    const month: string = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const day: string = currentDate.getDate().toString().padStart(2, "0");
    const year: number = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <Box sx={eachTransactionStyles.transactionListItem}>
      <Box sx={eachTransactionStyles.transactionListItemChildContainer}>
        <Box sx={eachTransactionStyles.transactionTypeDateContainer}>
          <Typography
            component="p"
            sx={
              eachTransaction.transactionType === "withdraw"
                ? { ...eachTransactionStyles.transactionCountTypeText }
                : {
                    ...eachTransactionStyles.transactionCountTypeText,
                    ...eachTransactionStyles.depositBackgroundColor,
                  }
            }
          >
            {eachTransaction.transactionId} {eachTransaction.transactionType}
          </Typography>
          <Typography component="p" sx={eachTransactionStyles.transactionDate}>
            {formatDateToRequiredFormat(eachTransaction.transactionDate)}
          </Typography>
        </Box>
        <Typography component="p" sx={eachTransactionStyles.transactionAmount}>
          -BDT {eachTransaction.transactionAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default EachTransaction;
