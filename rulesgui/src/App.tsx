import { PageLayout } from './components/PageLayout';
import './App.css';



/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/

// Show the login infomation if not already logged in, otherwise show the logged in page.
export default function App() {
    return (
        <PageLayout />
    );
}

