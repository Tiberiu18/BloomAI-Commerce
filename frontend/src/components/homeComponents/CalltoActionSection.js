import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Abonează-te la newsletter și primești 15% reducere la prima comandă!</h2>
              <p>...și multe alte oferte speciale</p>
              <form className="form-section">
                <input placeholder="Adresa ta de email..." name="email" type="email" />
              </form>
              <br></br>
              <form className="form-section">
                <input placeholder="Numărul tău de telefon..." name="phoneNumber" type="phone" pattern="^0[0-9]{9}$" />
                <br></br>
                <br></br>
                <input id="sign-up" value="Vreau reducerea de 15%!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
