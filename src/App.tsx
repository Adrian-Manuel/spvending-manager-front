import './App.css';
import { Route, Routes } from 'react-router';
import TenantsPage from './presentation/pages/TenantsPage/TenantsPage';
import ClubsPage from './presentation/pages/ClubsPage/ClubsPage';
import MachinesPage from './presentation/pages/MachinesPage/MachinesPage';
import UsersPage from './presentation/pages/UsersPage/UsersPage';
import { appRoutes } from './utilities/defines/routes';
import SelectedItemPage from './presentation/pages/SelectedItemPage/SelectedItemPage';
import LogginPage from './presentation/pages/LogginPage/LogginPage';
import Authorization from './security/Authorization';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

function App() {

	return (
		<>
			<Routes>
				<Route path={appRoutes.logginRoute} element={<LogginPage/>}/>
				<Route path={appRoutes.tenantsRoute} element={ <Authorization> <TenantsPage/> </Authorization>}/>
				<Route path={appRoutes.clubsRoute} element={ <Authorization> <ClubsPage/> </Authorization>}/>
				<Route path={appRoutes.machinesRoute} element={<Authorization> <MachinesPage/> </Authorization>}/>
				<Route path={appRoutes.usersRoute} element={<Authorization> <UsersPage/> </Authorization>} />
				<Route path={"/:itemType"+appRoutes.selectedItemRoute+"/:uuid"} element={<Authorization> <SelectedItemPage/> </Authorization>} />
			</Routes>
		</>
	)
}

export default App
