/**
 * Tipo que define uma string em sintaxe graphQl que foi convertida para json
 */
export type GraphQlJson = string ;

type JsonObject = {
	[key:string]:any
}

export const toJson = (string:string): GraphQlJson => 
{
  let args:any = null;


  const splitByLine = (string:string) => string.split('\n');
  
  const isObject    = (string:string) => string.indexOf(' {') > -1;

  const isProperty  = (string:string) => !isObject(string);

  const initObject  = (string:string) => string.replace(' {', ': {');

  const tranformToProperty = (string:string) => {
      let item:string[] = string.split('');
      item.push(': true');
      return item.join('');
  }
  
  const jsonfy = (item:string, index?:number) => {
      if(item === '{' || item.trim() === '}') return item;
      if(isObject(item)) return initObject(item)
      if(isProperty(item)) return tranformToProperty(item)
      return item
  }
  
  const setComas = (array:string[]) => {
      const couldHaveComa = (string:string) => string.includes('true\n') || string.includes('}\n');
      const shouldPutComa = (next?:string) => next && next.trim() !== '}';
      const result = [];
      for(let iterator = 0; iterator < array.length; iterator++)
      {
        let item = array[iterator]
        if(couldHaveComa(item) && shouldPutComa(array[iterator + 1])) {
          item = item.replace('\n',',\n');
        }
        result.push(item)
      }
      return result
  }

  const setQuotationMarks = (item:string, index?:number) => {
    let splited = item.trim().split(':');
        if(splited.length > 1){
          splited[0] = '"' + splited[0].trim() + '":';
          return splited.join('');
        }
    return item
  }

  const isFunction = (string:string) => string.indexOf('(') > -1 && string.indexOf(')') > -1;

  const setArgs = () => {
    let argsString = args.split(',');
    args = {}
    argsString.forEach( (item:string) => {
      const [key, value] = item.split(':');
      args[key.trim()] = value.trim().split('"').join("")
    });
            
  }

  const putArgs = (json:JsonObject) => {
	let [mainEntity] = Object.keys(json)
	let keyArgs = Object.keys(args)

	keyArgs.forEach((key:string) => {
		json[mainEntity][key] = args[key]
	}) 
	return json
  }

  const splitFromArgs = (string:string) => {
    
    const [beforeArguments, Arguments] = string.split('(')
    const [_, afterArguments] = string.split(')')
    args = Arguments.split(')')[0]
    setArgs()
    return [beforeArguments, afterArguments].join('');
  }

  

  const main = () => {
    const hasArgs = isFunction(string);
	
    if(hasArgs)
    {
      string = splitFromArgs(string);
    }
    
    let result = splitByLine(string)
                	.map(jsonfy)
			    	.map(setQuotationMarks)
                	.map(item => item + '\n');

    const resultWithComas = setComas(result);
    
    let objectQuery = JSON.parse(resultWithComas.join(""));

    if(hasArgs){
		objectQuery = putArgs(objectQuery);
    }
    
    return objectQuery;
  }

  return main();
}

const grapQlMapper = {
  toJson
}

export default grapQlMapper;