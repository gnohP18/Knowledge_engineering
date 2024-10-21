import { isArray } from "lodash-es";
import type { TreeNode } from "primevue/treenode";
import type { number, string } from "zod";
import { HASHTAG_EXAMPLE } from "~/constants/sample";
import type { PartialSelectedNode } from "~/entities/common";
import type {
  AttributeTypeEntity,
  JobAttributeEntity,
} from "~/entities/company/job";

/**
 * Get hashtag name
 *
 * @param id {number} id of hashtag
 * @returns name of hashtag
 */
export const mappingHashtag = (id: number) => {
  return HASHTAG_EXAMPLE.filter((item) => Number(item.code) === id)[0];
};

/**
 * Delay function
 * @param {countTime} number of milisecond
 * @returns
 */
export const delayFunc = (countTime: number) => {
  return new Promise((resolve) => setTimeout(resolve, countTime));
};

/**
 * Mapping JobAttribute to TreeNode
 *
 * @param {jobAttributes} AttributeTypeEntity Attribute need mapping
 * @returns {TreeNode[]}
 */
export const mappingTreeNode = (
  jobAttributes: AttributeTypeEntity[],
): TreeNode[] => {
  let result: TreeNode[] = [];

  jobAttributes.forEach((attributeType) => {
    const node: TreeNode = {
      key: attributeType.id,
      label: attributeType.name,
      icon: "pi pi-tags",
      selectable: true,
    };
    if (
      attributeType.job_attributes &&
      attributeType.job_attributes.length > 0
    ) {
      node.children = mappingJobAttribute(attributeType.job_attributes);
    }

    result.push(node);
  });

  return result;
};

/**
 * Recursion Job Attribute to create TreeNode
 * @param {data} JobAttributeEntity
 * @returns { data } TreeNode[] | []
 */
export const mappingJobAttribute = (data: JobAttributeEntity[]): TreeNode[] => {
  if (data && data.length > 0) {
    return data.map((item) => {
      const dataParentNode: TreeNode = {
        key: item.id,
        label: item.name,
        icon: "pi pi-tag",
      };
      if (item.job_attribute && item.job_attribute.length > 0) {
        dataParentNode.children = mappingJobAttribute(item.job_attribute);
      }

      return dataParentNode;
    });
  }

  return [];
};

/**
 * Mapping job attribute id to PartialSelectedNode[] with key
 * 
 * @param {dataNode} TreeNode[] from mapping Attribute job
 * @param {data} number[] id job attribute
 * @returns {result} PartialSelectedNode[]
 */
export const mappingResultData = (treeNodes: TreeNode[], ids: number[]): {
  data: PartialSelectedNode[], 
  countChild: number, 
  parentPartialChecked: boolean
} => {
  let result: PartialSelectedNode[] = [];
  let parentPartialChecked = false;
  let countChild = 0;
  // Check if treeNodes & ids are available
  if (treeNodes && treeNodes.length > 0 && ids && ids.length > 0) {
    // iterate treeNode    
    treeNodes.forEach((node) => {
      if (node.children && node.children?.length > 0) {
        //
        const childArr = mappingResultData(node.children, ids);
        let countExist = 0;

        // iterate PartialSelectedNode 
        childArr.data.forEach((_,key) => {
          if (_ && key) {
            result[key] = _;
            countExist++;
          }
        })
        
        // Check if any PartialSelectedNode in array
        if (countExist > 0) {
          result[Number(node.key)] = {
            checked: childArr.countChild === node.children?.length,
            partialChecked: childArr.parentPartialChecked
          };  
          
          parentPartialChecked = true;
        }
      } else {
        if (ids.includes(Number(node.key), 0)) {
          result[Number(node.key)] = {
            checked: true,
            partialChecked: false
          };    
          countChild++;
          parentPartialChecked = true;
        }
      }
    })
  }

  return { data:result, countChild , parentPartialChecked};
}
