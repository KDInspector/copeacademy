// lib/queries.ts

import { groq } from "next-sanity";

export const allCoursesQuery = groq`
  *[_type == "course"]{
    _id,
    title,
    description,
    accessLevel,
    duration,
    previewImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          palette
        }
      },
      alt
    },
    slug,
    createdAt,
    updatedAt,
    courseType,
    "faceCreateModule": faceCreateModule->{
      _id,
      moduleVideo{
        videoType,
        videoURL,
        uploadedVideo{
          asset->{
            _id,
            url
          }
        }
      },
      targets[]{
        targetFace{
          asset->{
            _id,
            url
          }
        },
        lineupFaces[]{
          asset->{
            _id,
            url
          }
        }
      },
      instruction
    },
    "lessons": *[_type == "lesson" && course._ref == ^._id]{
      _id,
      title,
      description,
      duration,
      videoURL,
      order,
      lessonType,
      faceCreateModule->{
        _id,
        moduleVideo{
          videoType,
          videoURL,
          uploadedVideo{
            asset->{
              _id,
              url
            }
          }
        },
        targets[]{
          targetFace{
            asset->{
              _id,
              url
            }
          },
          lineupFaces[]{
            asset->{
              _id,
              url
            }
          }
        },
        instruction
      }
    } | order(order asc)
  } | order(createdAt desc)
`;

export const singleCourseQuery = groq`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    description,
    accessLevel,
    duration,
    previewImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          palette
        }
      },
      alt
    },
    slug,
    createdAt,
    updatedAt,
    courseType,
    "faceCreateModule": faceCreateModule->{
      _id,
      moduleVideo{
        videoType,
        videoURL,
        uploadedVideo{
          asset->{
            _id,
            url
          }
        }
      },
      targets[]{
        targetFace{
          asset->{
            _id,
            url
          }
        },
        lineupFaces[]{
          asset->{
            _id,
            url
          }
        }
      },
      instruction
    },
    "lessons": *[_type == "lesson" && course._ref == ^._id]{
      _id,
      title,
      description,
      duration,
      videoURL,
      order,
      lessonType,
      faceCreateModule->{
        _id,
        moduleVideo{
          videoType,
          videoURL,
          uploadedVideo{
            asset->{
              _id,
              url
            }
          }
        },
        targets[]{
          targetFace{
            asset->{
              _id,
              url
            }
          },
          lineupFaces[]{
            asset->{
              _id,
              url
            }
          }
        },
        instruction
      }
    } | order(order asc)
  }
`;

export const faceCreateCourseQuery = groq`
*[_type == "course" && slug.current == $slug][0]{
  _id,
  title,
  duration,
  previewImage{
    asset->{
      _id,
      url
    },
    alt
  },
  accessLevel,
  slug,
  description,
  courseType,
  "faceCreateModule": faceCreateModule->{
    _id,
    title,
  },
  createdAt,
  updatedAt
}
`;

// export const faceCreateModuleQuery = groq`
//   *[_type == "faceCreate" && _id == $id][0]{
//     _id,
//     title,
//     moduleVideo{
//       videoType,
//       videoURL,
//       uploadedVideo{
//         asset->{
//           _id,
//           url
//         }
//       }
//     },
//     instruction
//   }
// `;

// @/lib/queries.ts

export const faceCreateModuleQuery = groq`
  *[_type == "faceCreate" && _id == $id][0]{
    _id,
    title,
    moduleVideo{
      videoType,
      videoURL,
      uploadedVideo{
        asset->{
          _id,
          url
        }
      }
    },
    instruction
  }
`;

export const faceComponentModuleQuery = groq`
  *[_type == "faceCreate"]{
    faceComponents{
      eyes[] {
        asset->{
          _id, 
          url
        }
      },
      noses[] {
        asset->{
          _id, 
          url
        }
      },
      mouths[] {
        asset->{
          _id, 
          url
        }
      }
    }
  }
`;
