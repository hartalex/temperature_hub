import Error from './Error'
import {renderTest} from '../../util/renderTest'
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

renderTest(Error, mockStore())
renderTest(Error, mockStore({'error': null}))
renderTest(Error, mockStore({'error': { 'title':'title', 'description':'description'}}))
