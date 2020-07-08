export const userSubscribedFilter = (key: string) => <
  P extends Record<string, Record<'userID', string>>,
  V extends { userID: string }
>(
  payload: P,
  variables: V,
): boolean => {
  const payloadUserID = payload[key].userID;
  const variablesUserID = variables.userID;

  return payloadUserID !== variablesUserID;
};
