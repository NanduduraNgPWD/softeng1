import './Dashboard.css';
import { Link } from 'react-router-dom';
function Dashboard() {
    const Overview = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#7284a0"} fill={"none"} {...props}>
          <path d="M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="12" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

      const Booking = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#7284a0"} fill={"none"} {...props}>
          <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      const Inventory = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#7284a0"} fill={"none"} {...props}>
          <path d="M20.198 3H3.802C3.05147 3 2.6762 3 2.41637 3.17726C2.28768 3.26505 2.18133 3.38109 2.10567 3.51627C1.9529 3.78921 1.99024 4.15793 2.06493 4.89537C2.18958 6.12624 2.2519 6.74168 2.57823 7.18168C2.74084 7.40095 2.94701 7.58519 3.18414 7.72315C3.65999 8 4.28635 8 5.53908 8H18.4609C19.7136 8 20.34 8 20.8159 7.72315C21.053 7.58519 21.2592 7.40095 21.4218 7.18168C21.7481 6.74168 21.8104 6.12624 21.9351 4.89537C22.0098 4.15793 22.0471 3.78921 21.8943 3.51627C21.8187 3.38109 21.7123 3.26505 21.5836 3.17726C21.3238 3 20.9485 3 20.198 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8L3 13.0408C3 16.7928 3 18.6688 4.17157 19.8344C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8344C21 18.6688 21 16.7928 21 13.0408V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
      const Profile = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#7284a0"} fill={"none"} {...props}>
          <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
return(

    <div className="dashboard-body  bg-slate-50 h-screen">
            <div className="nav w-80 h-full flex flex-col bg-white border-solid border-2 gap-6">
                <img className="w-28 mx-auto my-4"src="/images/logo1.svg" alt="" />
                <li><Link to="/"> <Overview/>Overview</Link> </li>
                <li><Link to="/Bookings"><Booking/>Bookings</Link> </li>
                <li><Link to="/Inventory"><Inventory/>Inventory</Link> </li>
                <li><Link to="/Profile"><Profile/>Profile</Link> </li>
            </div>

    </div>
)

}

export default Dashboard;