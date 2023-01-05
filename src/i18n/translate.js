import  React  from 'react';
import { FormattedMessage } from 'react-intl';

const translate =(id,value={})=><FormattedMessage id={id} values={{...value}} />

// Fonction à appeller pour la traduction
export default translate;