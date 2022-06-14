export const read = async ({ page, perPage, id } = {}) => {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));

  try {
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND}/candidate/getQuizById/${id}?page=${page}&perPage=${perPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${candidate.token}`,
        },
        // body: JSON.stringify({ countQuestion }),
      }
    );
    return result.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
