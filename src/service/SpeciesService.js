export default class SpeciesService {

    getSpecies() {
        return fetch('data/species.json').then(res => res.json())
                .then(d => d.data);
    }
}
