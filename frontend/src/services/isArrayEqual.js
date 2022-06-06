import _ from 'lodash';

export default function isArrayEqual(ar1, ar2) {
	return _(ar1).differenceWith(ar2, _.isEqual).isEmpty();
}
