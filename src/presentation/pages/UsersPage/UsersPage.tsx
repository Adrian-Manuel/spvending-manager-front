import './UsersPage.css';
import Main from './../../components/Main/Main';
import Header from './../../components/Header/Header';
import { infoDisplayUsers } from './../../../utilities/infoDisplay';
import { UserRepositoryHttp } from '../../../infraestructure/adapters/api/UserRepositoryHttp';
import { GetUserList } from '../../../application/usecases/UserUseCases/GetUserList';
import { useEffect, useState } from 'react';
import { UserInfoDisplay } from '../../../domain/entities/models/user';
import UserWarningModal from '../../components/WarningsModals/UserWarningModal/UserWarningModal';

const repository = new UserRepositoryHttp();
const getUserList = new GetUserList(repository);

function UsersPage() {
	const [ users, setUsers ] = useState<UserInfoDisplay[]>([]);
	const [ uuid, setUuid ] = useState("");
	const [ visible, setVisible ] = useState<boolean>(false);
	const [ position, setPosition ] = useState<"bottom">("bottom");
	const show = (position:'bottom') => {
		setPosition(position);
		setVisible(true);
	}

	useEffect(()=> {
		getUserList.execute()
			.then(setUsers)
			.catch(console.error);
	},[]);

	useEffect(() => {
		if (uuid != "") {
			show('bottom');
		}
	}, [uuid]);


	return (
		<>
			<Header />
			<Main textInfoDisplay={ infoDisplayUsers } dataToDisplay={users} setterUuid={setUuid}/>
			<UserWarningModal
				visible={visible}
				setVisible={() => { setVisible(false) }}
				uuid={uuid}
				setUuid={setUuid}
				position={position}
			/>
		</>
	)
}

export default UsersPage;