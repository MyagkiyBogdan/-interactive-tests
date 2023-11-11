// StatisticPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../components/Statistic.module.css";
import { useSelector } from "react-redux";
import { selectAllTests } from "redux/testsSlice";

interface StatisticData {
  correctcount: number;
  results: Record<string, boolean>;
  username: string;
}

const StatisticPage: React.FC = () => {
  const [statisticData, setStatisticData] = useState<StatisticData[]>([]);
  const allTests = useSelector(selectAllTests);

  useEffect(() => {
    const fetchStatisticData = async () => {
      try {
        const response = await axios.get<StatisticData[]>(
          "http://localhost:8081/api/tests/getAllTestingResults"
        );
        setStatisticData(response.data);
      } catch (error) {
        console.error("Ошибка при получении статистики:", error);
      }
    };
    fetchStatisticData();
  }, []);

  const tests =
    statisticData.length > 0 ? Object.keys(statisticData[0].results) : [];

  const calculatePassability = (testNumber: string) => {
    const correctAnswersCount = statisticData.filter(
      (userData) => userData.results[testNumber]
    ).length;
    const totalUsers = statisticData.length;
    return ((correctAnswersCount / totalUsers) * 100).toFixed(2);
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Статистика тестування</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.centerAlign}>№</th>
            <th className={styles.centerAlign}>User Name</th>
            {tests.map((testNumber) => (
              <th key={testNumber} className={styles.centerAlign}>
                Test {testNumber}
              </th>
            ))}
            <th className={`${styles.centerAlign} ${styles.noHighlight}`}>
              <p className={styles.text}>Result</p>
              <p className={styles.text}>(max {allTests.length})</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {statisticData.map((userData, index) => (
            <tr key={index}>
              <td className={styles.centerAlign}>{index + 1}</td>
              <td className={styles.leftAlign}>{userData.username}</td>
              {tests.map((testNumber) => (
                <td key={testNumber} className={styles.centerAlign}>
                  {userData.results[testNumber] ? "+" : "–"}
                </td>
              ))}
              <td className={`${styles.result}`}>{userData.correctcount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} className={styles.testPassaility}>
              % Test Passability
            </td>
            {tests.map((testNumber) => (
              <td
                key={testNumber}
                className={`${styles.centerAlign} ${
                  Number(calculatePassability(testNumber)) > 85
                    ? styles.green
                    : Number(calculatePassability(testNumber)) < 20
                    ? styles.red
                    : ""
                }`}
              >
                {calculatePassability(testNumber)}%
              </td>
            ))}
            <td
              className={`${styles.centerAlign} ${
                Number(calculatePassability("total")) > 90
                  ? styles.green
                  : Number(calculatePassability("total")) < 20
                  ? styles.red
                  : ""
              } ${styles.noHighlight}`}
            ></td>
          </tr>
        </tbody>
      </table>
      <div className={styles.explanation}>
        <div className={styles.explanationElement}>
          <div className={`${styles.colorBox} ${styles.greenBox}`} />
          <span>
            {" "}
            – ячейки такого кольору повідомляють про занадто легкі тести. Більше
            90% студенів проходить їх вірно. Будь-ласка прегляньте їх.
          </span>
        </div>
        <div className={styles.explanationElement}>
          <div className={`${styles.colorBox} ${styles.redBox}`} />
          <span>
            {" "}
            – ячейки такого кольору повідомляють про занадто складні тести.
            Меньше 20% студенів проходить їх вірно. Будь-ласка прегляньте їх
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
