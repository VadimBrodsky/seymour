import Shylog from 'shylog';

export default new Shylog({
  emit: !!window.location.search.match('debug=1'),
  logger: console.info,
});
