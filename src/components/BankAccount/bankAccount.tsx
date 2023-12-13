import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  Paper,
  FilledInput,
  FormHelperText,
} from "@mui/material";
import bankAccountStyles from "./BankAccount.styles";
import navLogo from "../../assets/navLogo.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EachTransaction from "../each_transaction/eachTransaction";
import EastIcon from "@mui/icons-material/East";
import {
  allUsersObjectsArray,
  MyUserObject,
  EachTransactionObj,
} from "../../data/usersData";

const BankAccount: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(300);
  const [usersArray, setUsersArray] =
    useState<MyUserObject[]>(allUsersObjectsArray);
  const [userCredentials, setUserCredentials] = useState<{
    userEnteredName: string;
    userEnteredPIN: string | number;
  }>({ userEnteredName: "", userEnteredPIN: "" });
  const [credentialsErrorMsg, setCredentialsErrorMsg] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [transerMoneyDetails, setTransferMoneyDetails] = useState<{
    userName: string;
    amountTransfered: number | string;
    transferErrorMsg: string;
  }>({ userName: "", amountTransfered: "", transferErrorMsg: "" });
  const [transactionId, setTransactionId] = useState<number>(1);
  const [presentUserLogin, setPresentUserLogin] = useState<MyUserObject>({
    loginUserId: 0,
    loginUserName: "",
    loginUserPIN: 0,
    loginUserTotalBal: 0,
    loginUserArrayOfTransactions: [],
  });
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanAmountErr, setLoanAmountErr] = useState<string>("");
  const [logoutUserCredentials, setLogoutuserCredentials] = useState<{
    logoutUserName: string;
    logoutUserPIN: string;
  }>({ logoutUserName: "", logoutUserPIN: "" });
  useEffect(() => {
    if (showDetails === true) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [showDetails]);

  useEffect(() => {
    if (seconds === 0) {
      setShowDetails(false);
    }
  }, [seconds]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calculateAmount = React.useCallback(
    (transactionsList: EachTransactionObj[], action: string) => {
      console.log("present");
      if (action === "withdraw") {
        const withdrawTotalAmount: number = transactionsList
          .filter(
            (eachTransaction: EachTransactionObj) =>
              eachTransaction.transactionType === "withdraw"
          )
          .reduce(
            (acc: number, b: EachTransactionObj) => acc + b.transactionAmount,
            0
          );
        return withdrawTotalAmount;
      }
      const depositTotalAmount: number = transactionsList
        .filter(
          (eachTransaction: EachTransactionObj) =>
            eachTransaction.transactionType === "deposit"
        )
        .reduce(
          (acc: number, b: EachTransactionObj) => acc + b.transactionAmount,
          0
        );
      return depositTotalAmount;
    },
    // eslint-disable-next-line
    [presentUserLogin]
  );

  function formatDateTime() {
    const now: Date = new Date();
    const day: number = now.getDate();
    const month: number = now.getMonth() + 1;
    const year: number = now.getFullYear();
    let hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    const ampm: string = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedDateTime = `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
  }

  const inputElementEventHandler = (e: {
    target: { name: string; value: string };
  }) => {
    if (
      e.target.name === "logoutUserName" ||
      e.target.name === "logoutUserPIN"
    ) {
      setLogoutuserCredentials((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    } else {
      setUserCredentials((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
    const userObject: MyUserObject | undefined = usersArray.find(
      (eachUser: MyUserObject) =>
        eachUser.loginUserName === userCredentials.userEnteredName &&
        +eachUser.loginUserPIN === +userCredentials.userEnteredPIN
    );
    console.log(userObject);
    if (userObject !== undefined) {
      setPresentUserLogin(userObject);
      setShowDetails(true);
    } else {
      setCredentialsErrorMsg("Invalid User Credentials");
    }
  };

  const inputTranserEventHandler = (e: {
    target: { name: string; value: string };
  }) => {
    setTransferMoneyDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitTransferAmountFormEventHandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const transferUserObj = usersArray.find(
      (eachuser) => eachuser.loginUserName === transerMoneyDetails.userName
    );
    if (transferUserObj === undefined) {
      setTransferMoneyDetails((prevData) => ({
        ...prevData,
        transferErrorMsg: "please provide valid username",
      }));
    } else {
      setUsersArray((prevState: MyUserObject[]) => {
        return prevState.map((eachUser) => {
          if (eachUser.loginUserName === presentUserLogin.loginUserName) {
            if (
              +transerMoneyDetails.amountTransfered >
              presentUserLogin.loginUserTotalBal
            ) {
              setTransferMoneyDetails((prevData) => ({
                ...prevData,
                transferErrorMsg: "insufficient balance",
              }));
              return eachUser;
            } else {
              const newUserObject = {
                loginUserId: eachUser.loginUserId,
                loginUserName: eachUser.loginUserName,
                loginUserPIN: eachUser.loginUserPIN,
                loginUserTotalBal:
                  eachUser.loginUserTotalBal -
                  +transerMoneyDetails.amountTransfered,
                loginUserArrayOfTransactions: [
                  {
                    transactionId: transactionId,
                    transactionType: "withdraw",
                    transactionDate: new Date(),
                    transactionAmount: +transerMoneyDetails.amountTransfered,
                  },
                  ...eachUser.loginUserArrayOfTransactions,
                ],
              };
              setPresentUserLogin(newUserObject);
              return newUserObject;
            }
          } else if (eachUser.loginUserName === transerMoneyDetails.userName) {
            setTransactionId(transactionId + 1);
            return {
              ...eachUser,
              loginUserTotalBal:
                +transerMoneyDetails.amountTransfered +
                eachUser.loginUserTotalBal,
              loginUserArrayOfTransactions: [
                {
                  transactionId: transactionId,
                  transactionType: "deposit",
                  transactionDate: new Date(),
                  transactionAmount: +transerMoneyDetails.amountTransfered,
                },
                ...eachUser.loginUserArrayOfTransactions,
              ],
            };
          }
          return eachUser;
        });
      });
    }
  };

  const requestLoanSubmitEventHandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (presentUserLogin.loginUserTotalBal >= loanAmount * (10 / 100)) {
      setPresentUserLogin((prevState) => ({
        ...prevState,
        loginUserTotalBal: prevState.loginUserTotalBal + loanAmount,
        loginUserArrayOfTransactions: [
          {
            transactionId,
            transactionAmount: loanAmount,
            transactionDate: new Date(),
            transactionType: "deposit",
          },
          ...prevState.loginUserArrayOfTransactions,
        ],
      }));
      setUsersArray((prevState: MyUserObject[]) => {
        return prevState.map((eachUser) => {
          if (eachUser.loginUserName === presentUserLogin.loginUserName) {
            setTransactionId(transactionId + 1);
            return {
              ...eachUser,
              loginUserTotalBal: eachUser.loginUserTotalBal + loanAmount,
              loginUserArrayOfTransactions: [
                {
                  transactionId,
                  transactionAmount: loanAmount,
                  transactionDate: new Date(),
                  transactionType: "deposit",
                },
                ...eachUser.loginUserArrayOfTransactions,
              ],
            };
          }
          return eachUser;
        });
      });
    } else {
      setLoanAmountErr("*loan Not accepted due to insufficient balance");
    }
  };

  const closeAccountFormEventhandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const userObject: MyUserObject | undefined = usersArray.find(
      (eachUser: MyUserObject) =>
        eachUser.loginUserName === logoutUserCredentials.logoutUserName &&
        +eachUser.loginUserPIN === +logoutUserCredentials.logoutUserPIN &&
        presentUserLogin.loginUserName ===
          logoutUserCredentials.logoutUserName &&
        presentUserLogin.loginUserPIN === +logoutUserCredentials.logoutUserPIN
    );
    // console.log(userObject);
    if (userObject !== undefined) {
      setShowDetails(false);
    }
  };

  return (
    <Box sx={bankAccountStyles.bankAccContainer}>
      <Box sx={bankAccountStyles.bankAccChildContainer}>
        <Box sx={bankAccountStyles.navContainer}>
          <Typography component="h1" sx={bankAccountStyles.welcomeBackHeading}>
            Welcome back Alamin!
          </Typography>
          <Box
            alt="nav-logo"
            sx={bankAccountStyles.navLogo}
            component="img"
            src={navLogo}
          />
          <Box
            component="form"
            sx={bankAccountStyles.navInputsContainer}
            onSubmit={onSubmitForm}
          >
            <TextField
              sx={bankAccountStyles.navInput}
              type="text"
              label="user"
              name="userEnteredName"
              value={userCredentials.userEnteredName}
              onChange={inputElementEventHandler}
            />
            <TextField
              sx={bankAccountStyles.navInput}
              type="text"
              label="PIN"
              name="userEnteredPIN"
              value={userCredentials.userEnteredPIN}
              onChange={inputElementEventHandler}
            />
            <Button type="submit" sx={bankAccountStyles.arrowBtn}>
              <ArrowRightAltIcon sx={bankAccountStyles.arrowIcon} />
            </Button>
            {credentialsErrorMsg && (
              <Typography
                component="p"
                sx={bankAccountStyles.credentialsErrorMsg}
              >
                {credentialsErrorMsg}
              </Typography>
            )}
          </Box>
        </Box>
        {showDetails && (
          <Box sx={bankAccountStyles.showingDetailsContainer}>
            <Box sx={bankAccountStyles.balanceContainer}>
              <Box sx={bankAccountStyles.curentBalanceContainer}>
                <Typography
                  component="h2"
                  sx={bankAccountStyles.currentBalanceHeading}
                >
                  Current balance
                </Typography>
                <Typography
                  component="p"
                  sx={bankAccountStyles.currentBalanceDate}
                >
                  As of {formatDateTime()}
                </Typography>
              </Box>
              <Typography
                component="p"
                sx={bankAccountStyles.currentBalanceNumber}
              >
                BDT {presentUserLogin.loginUserTotalBal}
              </Typography>
            </Box>
            <Box sx={bankAccountStyles.transactionsBodyContainer}>
              <Box sx={bankAccountStyles.transactionsBodyLeftContainer}>
                <Box sx={bankAccountStyles.transactionsContainer}>
                  {presentUserLogin.loginUserArrayOfTransactions.map(
                    (eachTransaction) => (
                      <EachTransaction
                        key={eachTransaction.transactionId}
                        eachTransaction={eachTransaction}
                        loginUser={presentUserLogin}
                      />
                    )
                  )}
                </Box>
              </Box>
              <Box sx={bankAccountStyles.rightContainer}>
                <Grid
                  container
                  spacing={0}
                  sx={bankAccountStyles.gridContainer}
                >
                  <Grid item xs={12}>
                    <Paper sx={bankAccountStyles.transferMoneyPaper}>
                      <Typography
                        variant="h2"
                        sx={bankAccountStyles.transferMoneyTxt}
                      >
                        Transfer Money
                      </Typography>
                      <Box
                        component="form"
                        sx={bankAccountStyles.formArrowContainer}
                        onSubmit={onSubmitTransferAmountFormEventHandler}
                      >
                        <FormControl
                          sx={bankAccountStyles.form}
                          variant="filled"
                        >
                          <FilledInput
                            sx={bankAccountStyles.transferToInput}
                            onChange={inputTranserEventHandler}
                            inputProps={{
                              style: { padding: "5px", paddingLeft: "20px" },
                            }}
                            name="userName"
                            type="text"
                            value={transerMoneyDetails.userName}
                          />
                          <FormHelperText>Transfer to</FormHelperText>
                        </FormControl>
                        <FormControl
                          sx={bankAccountStyles.form}
                          variant="filled"
                        >
                          <FilledInput
                            sx={bankAccountStyles.transferToInput}
                            inputProps={{
                              style: { padding: "10px", paddingLeft: "20px" },
                            }}
                            onChange={inputTranserEventHandler}
                            name="amountTransfered"
                            value={transerMoneyDetails.amountTransfered}
                            type="number"
                          />
                          <FormHelperText>Amount</FormHelperText>
                        </FormControl>
                        <Button
                          type="submit"
                          sx={bankAccountStyles.arrowIconBtn}
                        >
                          <EastIcon sx={bankAccountStyles.arrowIcon1} />
                        </Button>
                      </Box>
                      {transerMoneyDetails.transferErrorMsg ?? (
                        <Typography
                          component="p"
                          sx={{
                            ...bankAccountStyles.credentialsErrorMsg,
                            color: "red !important",
                          }}
                        >
                          {transerMoneyDetails.transferErrorMsg}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={bankAccountStyles.RequestLoanPaper}>
                      <Typography
                        variant="h2"
                        sx={bankAccountStyles.transferMoneyTxt}
                      >
                        Request loan
                      </Typography>
                      <Box
                        component="form"
                        sx={bankAccountStyles.formArrowContainer}
                        onSubmit={requestLoanSubmitEventHandler}
                      >
                        <FormControl
                          sx={bankAccountStyles.form}
                          variant="filled"
                        >
                          <FilledInput
                            sx={{
                              ...bankAccountStyles.transferToInput,
                              ...bankAccountStyles.loanInput,
                            }}
                            inputProps={{
                              style: { padding: "10px", paddingLeft: "20px" },
                            }}
                            value={loanAmount}
                            type="number"
                            onChange={(e) => setLoanAmount(+e.target.value)}
                          />
                          <FormHelperText>Amount</FormHelperText>
                        </FormControl>
                        <Button
                          sx={bankAccountStyles.arrowIconBtn}
                          type="submit"
                        >
                          <EastIcon sx={bankAccountStyles.arrowIcon1} />
                        </Button>
                      </Box>
                      {loanAmountErr && (
                        <Typography
                          component="p"
                          sx={bankAccountStyles.credentialsErrorMsg}
                        >
                          {loanAmountErr}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={bankAccountStyles.closeAccountPaper}>
                      <Typography
                        variant="h2"
                        sx={bankAccountStyles.transferMoneyTxt}
                      >
                        Close account
                      </Typography>
                      <Box
                        component="form"
                        onSubmit={closeAccountFormEventhandler}
                        sx={bankAccountStyles.formArrowContainer}
                      >
                        <FormControl
                          sx={bankAccountStyles.form}
                          variant="filled"
                        >
                          <FilledInput
                            sx={{
                              ...bankAccountStyles.transferToInput,
                              backgroundColor: "#F68B9D",
                            }}
                            inputProps={{
                              style: { padding: "5px", paddingLeft: "20px" },
                            }}
                            onChange={inputElementEventHandler}
                            name="logoutUserName"
                            value={logoutUserCredentials.logoutUserName}
                          />
                          <FormHelperText>Confirm user</FormHelperText>
                        </FormControl>
                        <FormControl
                          sx={bankAccountStyles.form}
                          variant="filled"
                        >
                          <FilledInput
                            sx={{
                              ...bankAccountStyles.transferToInput,
                              backgroundColor: "#F68B9D",
                            }}
                            inputProps={{
                              style: { padding: "10px", paddingLeft: "20px" },
                            }}
                            onChange={inputElementEventHandler}
                            name="logoutUserPIN"
                            value={logoutUserCredentials.logoutUserPIN}
                          />
                          <FormHelperText>Confirm PIN</FormHelperText>
                        </FormControl>
                        <Button
                          sx={bankAccountStyles.arrowIconBtn}
                          type="submit"
                        >
                          <EastIcon sx={bankAccountStyles.arrowIcon1} />
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={bankAccountStyles.amountsLogoutTimeContainer}>
              <Box sx={bankAccountStyles.totalAmountsContainer}>
                <Typography sx={bankAccountStyles.amount}>
                  IN
                  <Box component="span" sx={bankAccountStyles.spanEl}>
                    BDT {"\t\t"}
                    {calculateAmount(
                      presentUserLogin.loginUserArrayOfTransactions,
                      "deposit"
                    )}
                  </Box>
                </Typography>
                <Typography sx={bankAccountStyles.amount}>
                  OUT
                  <Box
                    component="span"
                    sx={{ ...bankAccountStyles.spanEl, color: "#EE385C" }}
                  >
                    BDT {"\t\t"}
                    {calculateAmount(
                      presentUserLogin.loginUserArrayOfTransactions,
                      "withdraw"
                    )}
                  </Box>
                </Typography>
                <Typography sx={bankAccountStyles.amount}>
                  INTEREST
                  <Box component="span" sx={bankAccountStyles.spanEl}>
                    BDT 10,530.00
                  </Box>
                </Typography>
              </Box>
              <Box sx={bankAccountStyles.logoutTimeContainer}>
                <Typography sx={bankAccountStyles.logoutTimeText}>
                  You will be logged out in {formatTime(seconds)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BankAccount;
