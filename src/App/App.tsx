import GlobalStyles from '../Assets/styles/GlobalStyles';
import CalendarElement from '../Components/Calendar/Calendar';
import Header from '../Components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <>
            <Header />        
            <GlobalStyles />
            <CalendarElement />
            <ToastContainer />
        </>
    )
}

export default App;

