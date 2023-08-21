import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register} from "./../Redux/Actions/userActions";
import MessageGroup from './../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import EnhancedSelect from "../data/EnhancedSelect";
import EnhancedSelectSingleChoice from "../data/EnhancedSelectSingleChoice";
import axios from "axios";
import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";


const Register = ({history,location}) => {
  window.scrollTo(0, 0);

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("Masculin");
  const [ageGroup, setageGroup] = useState("Under 18");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [flowers, setFlowers] = useState([]);
    

  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss : false,
    draggable:false,
    pauseOnHover:false,
    autoClose:2000
  };


  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1]: "/";

  const userRegister = useSelector(state => state.userRegister);

  const {error,loading,userInfo} = userRegister;

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

  const ageGroupOptions = [
    { value: 'Under 18', label: 'Sub 18 ani' },
    { value: '18 - 30', label: '18-30 ani' },
    { value: '31 - 45', label: '31-45 ani' },
    { value: '46+', label: '46+' },
  ];

  const genderOptions = [
    { value: 'Masculin', label: 'Masculin' },
    { value: 'Feminin', label: 'Feminin' },
  ];

  useEffect(() => {
    if(userInfo){
      history.push(redirect);
    }
      fetchFlowers();
  }, [history,userInfo,redirect]);



  const submitHandler = (e) => {
    e.preventDefault();
    if(!name || !email || !password){
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Vă rog să completați toate câmpurile!",Toastobjects);
        }
    }
    else if (selectedColors.length !== 3 || selectedFlowers.length !== 3){
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Vă rog să selectați exact 3 flori și exact 3 culori!",Toastobjects);
        }
    }
    else if (password.length < 6){
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.error("Pentru o mai bună securitate a contului dumneavoastră, parola ar trebui sa aibă cel puțin 6 caractere!",Toastobjects);
        }
    }
    else{
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.success("Contul a fost creat cu succes!",Toastobjects);
        }
      dispatch(register(name,email,password, sex.value, ageGroup.value,selectedColors, selectedFlowers ) );
    }
  };
  

  

  const handleColorChange = (selectedOptions) => {
    // We only want for a user to select 3 colors
    if (selectedOptions.length > 3) {
      alert('Selectează doar 3 culori!')
    }
    else{
      setSelectedColors(selectedOptions);
    }
  };

  const handleSelectedFlowers = (selectedOptions) => {
    // We only want for a user to select 3 flowers
    if (selectedOptions.length > 3) {
      alert('Selectează doar 3 flori!')
    }
    else{
      setSelectedFlowers(selectedOptions);
    }
  };

  const handleGenderChange = (selectedOptions) => {
    setSex(selectedOptions);
  };

  const handleAgeGroupChange = (selectedOptions) => {
    setageGroup(selectedOptions);
  };




  return (
    <>
      <Header />
      <Toast/>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center" style={{paddingTop:'0px', paddingBottom:'0px'}} >
        {error && <MessageGroup variant="alert-danger">{error}</MessageGroup>} 
        {loading && <Loading></Loading>}
        <form className="Login col-md-6 col-lg-4 col-8" onSubmit={submitHandler} style={{paddingTop:'0px', paddingBottom:'0px'}} >
          <input type="text" placeholder="Nume utilizator" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Adresă de email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Parolă" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="sex">Gen:</label>
          <EnhancedSelectSingleChoice myOptions={genderOptions} selectedOptions={sex} onChangeFunction={handleGenderChange} />
      

      <label htmlFor="ageGroup">Vârstă:</label>
      <EnhancedSelectSingleChoice myOptions={ageGroupOptions} selectedOptions={ageGroup} onChangeFunction={handleAgeGroupChange} />
      
      <label  htmlFor="colors">Culori preferate (selectează 3):</label> 
      <EnhancedSelect  myOptions={colourOptions}  selectedOptions={selectedColors} 
      onChangeFunction={handleColorChange} />


      <label htmlFor="flowers">Flori preferate (selectează 3):</label>
      <EnhancedSelect myOptions={flowers} selectedOptions={selectedFlowers} onChangeFunction={handleSelectedFlowers} />

       

          <button type="submit">Înregistrare</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Ai deja un cont? <strong>Apasă aici pentru a te loga</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
    
  );
};



export default Register;
