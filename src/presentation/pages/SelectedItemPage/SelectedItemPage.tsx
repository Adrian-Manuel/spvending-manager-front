import Aside from "../../components/Aside/Aside";
import DisplayItemInfo from "../../components/DisplayItemInfo/DisplayItemInfo";
import Header from "../../components/Header/Header";
import "./SelectedItemPage.css"

function SelectedItemPage() {
    

	return (
        <>
            <Header/>
            <main>
                <Aside/>
                <DisplayItemInfo/>
            </main>
        </>
	)
}

export default SelectedItemPage;