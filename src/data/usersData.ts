export interface EachTransactionObj {
  transactionId: number;
  transactionType: string;
  transactionDate: Date;
  transactionAmount: number;
}

export interface MyUserObject {
  loginUserId: number;
  loginUserName: string;
  loginUserPIN: number;
  loginUserTotalBal: number;
  loginUserArrayOfTransactions: EachTransactionObj[];
}

export const allUsersObjectsArray: MyUserObject[] = [
  {
    loginUserId: 1,
    loginUserName: "bharath",
    loginUserPIN: 1234,
    loginUserTotalBal: 5000,
    loginUserArrayOfTransactions: [],
  },

  {
    loginUserId: 2,
    loginUserName: "dundi",
    loginUserPIN: 5678,
    loginUserTotalBal: 10000,
    loginUserArrayOfTransactions: [],
  },

  {
    loginUserId: 3,
    loginUserName: "santha",
    loginUserPIN: 1437,
    loginUserTotalBal: 15000,
    loginUserArrayOfTransactions: [],
  },
];

export interface ReducerTransactionTypesState {
  amount: number;
}
