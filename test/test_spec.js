import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

describe.skip('immutable js', () =>{
  it('fromJS is the same as Maps and Lists', () => {
    let map = Map({
      name: 'Map',
      list: List([1,2,3]),
      map: Map({
        name: 'InnerMap',
        innerMap: Map({
          name: 'Inner InnerMap'
        })
      })
    });  

    expect(map).to.equal(fromJS({
      name: 'Map',
      list: [1,2,3],
      map: {
        name: 'InnerMap',
        innerMap: {
          name: 'Inner InnerMap'
        }
      }
    }));
  });

  it('shallow merge works as expected', () => {
    let map =fromJS({
      name: 'John',
      age: 23,
      secret: {
        name: 'Malvolio',
        age: 27
      }
    });

    expect(map.merge(fromJS({name: 'Mark', age: 24}))).to.equal(fromJS({
      name: 'Mark',
      age: 24,
      secret: {
        name: 'Malvolio',
        age: 27
      }
    }));
  });

  it('mixed kind of merge', () => {
    let map =fromJS({
      name: 'John',
      age: 23,
      secret: {
        name: 'Malvolio',
        age: 27
      }
    });

    expect(map.mergeDeep({name: 'Rain', secret: {age: 22}})).to.equal(fromJS({
      name: 'Rain',
      age: 23,
      secret: {
        name: 'Malvolio',
        age: 22
      }
    }));

  });

  it('deep merge works as expected', () => {
    let map = fromJS({
      avengers: {
        ironman: {
          name: 'Tony Stark'
        }
      }
    });
    let map2 = fromJS({
      avengers: {
        hawkeye: {
          name: 'Ethan Something'
        }
      }
    });

    let merged = map.mergeDeep(map2);
    expect(merged).to.equal(fromJS({
      avengers: {
        ironman: {
          name: 'Tony Stark'
        },
        hawkeye: {
          name: 'Ethan Something'
        }
      }
    }));
  });
});
