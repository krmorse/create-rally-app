import App from './App';
import { Sdk } from 'rally-sdk';

const appProps = {
    foo: 'bar'
};
Sdk.renderApp(<App { ...appProps } />);