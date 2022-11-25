import * as defaultAvailability from './employee-availability.json';
import * as covidForm from './covid-screening-form.config.json';

export class Utils {

    static getDefaultAvailability(): any {
        return defaultAvailability;
    }

    static getCovidScreeningFormConfig(): any {
        return covidForm;
    }
}