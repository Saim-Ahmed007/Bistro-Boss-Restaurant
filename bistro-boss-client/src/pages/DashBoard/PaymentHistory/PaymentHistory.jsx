import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        heading="payment history"
        subHeading="At a Glance"
      ></SectionTitle>
      <div className="overflow-x-auto lg:ml-20">
        <h2 className="text-2xl mb-3">Total Payments : {payments.length}</h2>
        <table className="table">
          {/* head */}
          <thead className="bg-gray-500">
            <tr>
              <th>#</th>
              <th>EMAIL</th>
              <th>TRANSCTION ID</th>
              <th>TOTAL PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment, index) => <tr key={payment._id}>
                    <td>{index+1}</td>
                    <td>{payment.email}</td>
                    <td>{payment.transctionId}</td>
                    <td>{payment.price}</td>
                    <td>{payment.status}</td>
                </tr>)
            }
            
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
