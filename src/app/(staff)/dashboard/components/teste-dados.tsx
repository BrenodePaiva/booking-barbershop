import { getWeeklyRevenue } from "@/data/dashboard/get-weekly-revenue";

const TesteDados = async () => {
  const data = await getWeeklyRevenue();
  console.log(data);
  return <h1>Teste de dados</h1>;
};

export default TesteDados;
