import {ErrorComponent} from './Error'
import {renderTest} from '../../util/renderTest'
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

renderTest(ErrorComponent, mockStore())
renderTest(ErrorComponent, mockStore({'error': null}))
renderTest(ErrorComponent, mockStore({'error': { 'title':'title', 'description':'description'}}))
