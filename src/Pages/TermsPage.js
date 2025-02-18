import React from 'react';
import '../Styles/privacy.css';


const TermsPage = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">Terms and Conditions</h1>
        
        <div className="effective-date">
          Effective date: June 11, 2024
        </div>

        <section className="terms-section">
          <h2>Agreement to Terms</h2>
          <p>
            By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You're not allowed to copy, or modify the app, any part of the app, or our trademarks in any way.
            ReNote AI Pvt Ltd is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.

The ReNoteAI app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the ReNoteAI app won’t work properly or at all.

You should be aware that there are certain things that ReNote AI Pvt Ltd will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but ReNote AI Pvt Ltd cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.

If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.

Along the same lines, ReNote AI Pvt Ltd cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, ReNote AI Pvt Ltd cannot accept responsibility.

With respect to ReNote AI Pvt Ltd’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. ReNote AI Pvt Ltd accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app

At some point, we may wish to update the app. The app is currently available on Android &iOS – the requirements for both systems(and for any additional systems. we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. ReNote AI Pvt Ltd does not promise that it will always update the app so that it is relevant to you and/or works with the Android &iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.

Data Management and Deletion Clause 
          </p>
        </section>

        <section className="terms-section">
          <h2>Data Management and Storage</h2>
          <p>
            The documents scanned and managed through our application are stored solely in the default folder "ReNoteAI" in cloud storage associated with the email account used to log into the App.
          </p>
          <ul className="terms-list">
            <li>Users are required to manage all files and documents exclusively through the App</li>
            <li>The App does not store or backup any user data independently</li>
            <li>Users assume full responsibility for managing their cloud storage folders</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>Changes to Service</h2>
          <p>
            ReNote AI Pvt Ltd is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason.
          </p>
        </section>

        <section className="terms-section">
          <h2>Disclaimer of Liability</h2>
          <p>
            The Company shall not be held liable for any loss of data resulting from the user's direct deletion of files from the cloud storage folder. Users assume full responsibility for managing their cloud storage folders in compliance with these terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>Contact Information</h2>
          <p>
            If you have any questions or suggestions about our Terms and Conditions, please contact us at{' '}
            <a href="mailto:info@renote.ai" className="contact-link">
              info@renote.ai
            </a>
          </p>
        </section>
      </div>

      <footer className="terms-footer">
        <p>Last updated: April 25, 2024</p>
      </footer>
    </div>
  );
};

export default TermsPage;