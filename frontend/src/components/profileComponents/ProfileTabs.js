import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from './../LoadingError/Loading';
import Message from './../LoadingError/Error';
import Toast from './../LoadingError/Toast';
import {updateProfile} from './../../Redux/Actions/userActions'
import EnhancedSelect from "../../data/EnhancedSelect";
import EnhancedSelectSingleChoice from "../../data/EnhancedSelectSingleChoice";
import axios from "axios";


const ProfileTabs = () => {




  const {userInfo} = useSelector(state => state.userLogin);

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState(userInfo.sex);
  const [ageGroup, setageGroup] = useState(userInfo.ageGroup);
  const [favoriteColors, setfavoriteColors] = useState(userInfo.favoriteColors);
  const [favoriteFlowers, setfavoriteFlowers] = useState(userInfo.favoriteFlowers);
  const [flowers, setFlowers] = useState([]);

  const fetchFlowers = async () => {
    try {
      const response = await axios.get('/api/products/all');
      const products = response.data;
      const names = products.map(flower => flower.name);
      // for each flower, we create an object with "value" and "label" properties
      // this is the format that the EnhancedSelect component expects
      const options = names.map(name => {
        return {
          value: name,
          label: name,
        }
      });
      setFlowers(options);
    } catch (error) {
      console.error('Eroare la obținerea numelor produselor:', error);
    }
  };


  
  

  const handleColorChange = (selectedOptions) => {
    // We only want for a user to select 3 colors
    if (selectedOptions.length > 3) {
      alert('Selectează doar 3 culori!')
    }
    else{
      setfavoriteColors(selectedOptions);
    }
  };

  const handlefavoriteFlowers = (selectedOptions) => {
    // We only want for a user to select 3 flowers
    if (selectedOptions.length > 3) {
      alert('Selectează doar 3 flori!')
    }
    else{
      setfavoriteFlowers(selectedOptions);
    }
  };

  const handleGenderChange = (selectedOptions) => {
    setSex(selectedOptions);
  };

  const handleAgeGroupChange = (selectedOptions) => {
    setageGroup(selectedOptions);
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {loading:updateLoading} = updateProfile;

  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss : false,
    draggable:false,
    pauseOnHover:false,
    autoClose:2000
  };

  


  useEffect(()=>{
    if(user){
      setName(user.name);
      setEmail(user.email);
      
      //setageGroup(user.ageGroup);
      console.log(user.ageGroup);
      console.log(ageGroup);
    }
    fetchFlowers();
  }, [dispatch,user]);

 

  
  const colourOptions = [
    { value: 'Albastru', label: 'Albastru' },
    { value: 'Rosu', label: 'Roșu' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Galben', label: 'Galben' },
    { value: 'Portocaliu', label: 'Portocaliu' },
    { value: 'Violet', label: 'Violet' },
    { value: 'Roz', label: 'Roz' },
    { value: 'Maro', label: 'Maro' },
    { value: 'Gri', label: 'Gri' },
    { value: 'Negru', label: 'Negru' },
    { value: 'Bej', label: 'Bej' },
    { value: 'Auriu', label: 'Auriu' },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword ){
      if(!toast.isActive(toastId.current)){
      toastId.current = toast.error("Parolele nu se potrivesc!",Toastobjects);
      }
    }
    else if (favoriteColors.length !== 3 || favoriteFlowers.length !== 3){
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Vă rog selectați exact 3 flori și 3 culori!",Toastobjects);
        }
    }
    else if (newPassword.length < 6){
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Pentru o mai bună securitate a contului dumneavoastră, noua parolă ar trebui sa aibă cel puțin 6 caractere!",Toastobjects);
        }
    }
    else{
      dispatch(updateProfile({id:user._id, name, email, newPassword, sex, ageGroup, favoriteColors, favoriteFlowers}))
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.success("Profil actualizat cu succes!",Toastobjects);
        }
    }
  };

  return (
    <>
    <Toast/>
    {error && <Message variant="danger" Toastobjects={Toastobjects}>{error}</Message>}
    {loading && <Loading/>}
    {updateLoading && <Loading/>}
      <form className="row form-container"  onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Nume utilizator</label>
            <input className="form-control" type="text" required value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Adresă de email</label>
            <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Parolă noua</label>
            <input className="form-control" type="password" value={newPassword} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirmă parola</label>
            <input className="form-control" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
            <label htmlFor="sex">Gen:</label>
          <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="Masculin">Masculin</option>
            <option value="Feminin">Feminin</option>
          </select>
        </div>


        <div className="col-md-6">
          <label htmlFor="ageGroup">Vârstă:</label>
          <select id="ageGroup" value={ageGroup} onChange={(e) => setageGroup(e.target.value)}>
            <option value="Under 18">Sub 18 ani</option>
            <option value="18 - 30">18 - 30</option>
            <option value="31 - 45">31 - 45</option>
            <option value="46+">46 +</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="colors">Culorile preferate:</label>
          <EnhancedSelect myOptions={colourOptions} selectedOptions={favoriteColors} onChangeFunction={handleColorChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="flowers">Florile preferate:</label>
          <EnhancedSelect myOptions={flowers} selectedOptions={favoriteFlowers} onChangeFunction={handlefavoriteFlowers} />
        </div>


        <button type="submit">Actualizează profil</button>
      </form>
    </>
  );
};

export default ProfileTabs;
