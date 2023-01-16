/**
 * Tipo que define uma string em sintaxe graphQl que foi convertida para json
 */
export type GraphQlJson = string ;

export const toJson = (string:string): GraphQlJson => 
{
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

  const getArgs = (string:string) => {
    const splitByParenteses = string.split('(')[1].split(')')[0]
    const args = splitByParenteses.split(',').reduce((acc: any, curr) => {
        const key = curr.split(':')[0].trim();
        const value = curr.split(':')[1].trim().split('"').join('');
        acc[key]= value
        return acc
    }, {})
    return args 
  }

  const isFunction = (arr:string[]) => arr.join('').indexOf('(') > -1 && arr.join('').indexOf(')') > -1;

  const splitFromArgs = (arr:string[]) => {
    let joined = arr.join('');
    return [joined.split('(')[0], joined.split(')')[1]].join('');
  }

  const main = () => {
        let result = splitByLine(string)
                      .map(jsonfy)
        
        let args = false;
        
        if(isFunction(result)) 
        {
          args = getArgs(result[1]);
          result = splitFromArgs(result)
        }


        result 
              .map(item => {
                console.log({item})
                return item
              })
					    .map(setQuotationMarks)
              .map(item => item + '\n');

        const resultWithComas = setComas(result);
		
        return JSON.parse(resultWithComas.join(""))
  }

  return main();
}

const grapQlMapper = {
  toJson
}

export default grapQlMapper;