import json, pathlib
ROOT = pathlib.Path('.')
catalog_path = ROOT / 'src/data/catalog.json'
with open(catalog_path, 'r', encoding='utf-8') as f:
    catalog = json.load(f)
NEW_PAPERS = [
  {'id':'history-12-nov-2024-eng-p1','subjectId':'history','grade':12,'year':2024,'examType':'November','paperNumber':1,'title':'History P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'history-12-nov-2024-eng-p2','subjectId':'history','grade':12,'year':2024,'examType':'November','paperNumber':2,'title':'History P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'history-11-nov-2024-eng-p1','subjectId':'history','grade':11,'year':2024,'examType':'November','paperNumber':1,'title':'History P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'history-11-nov-2024-eng-p2','subjectId':'history','grade':11,'year':2024,'examType':'November','paperNumber':2,'title':'History P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'history-10-nov-2024-eng-p1','subjectId':'history','grade':10,'year':2024,'examType':'November','paperNumber':1,'title':'History P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'history-10-nov-2024-eng-p2','subjectId':'history','grade':10,'year':2024,'examType':'November','paperNumber':2,'title':'History P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'life-sciences-12-nov-2024-p2','subjectId':'life-sciences','grade':12,'year':2024,'examType':'November','paperNumber':2,'title':'Life Sciences P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':['human-body'],'sourceUrl':'https://www.education.gov.za'},
  {'id':'life-sciences-11-nov-2024-p1','subjectId':'life-sciences','grade':11,'year':2024,'examType':'November','paperNumber':1,'title':'Life Sciences P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'2½ hours','marks':150,'tags':['genetics','evolution'],'sourceUrl':'https://www.education.gov.za'},
  {'id':'life-sciences-11-nov-2024-p2','subjectId':'life-sciences','grade':11,'year':2024,'examType':'November','paperNumber':2,'title':'Life Sciences P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':['human-giology'],'sourceUrl':'https://www.education.gov.za'},
  {'id':'life-sciences-10-nov-2024-p1','subjectId':'life-sciences','grade':10,'year':2024,'examType':'November','paperNumber':1,'title':'Life Sciences P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'2 hours','marks':150,'tags':['biology'],'sourceUrl':'https://www.education.gov.za'},
  {'id':'life-sciences-10-nov-2024-p2','subjectId':'life-sciences','grade':10,'year':2024,'examType':'November','paperNumber':2,'title':'Life Sciences P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'cat-12-nov-2023-p1','subjectId':'cat','grade':12,'year':2023,'examType':'November','paperNumber':1,'title':'CAT P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':['html','databases'],'sourceUrl':'https://www.education.gov.za'},
  {'id':'cat-11-nov-2024-p1','subjectId':'cat','grade':11,'year':2024,'examType':'November','paperNumber':1,'title':'CAT P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'cat-11-nov-2024-p2','subjectId':'cat','grade':11,'year':2024,'examType':'November','paperNumber':2,'title':'CAT P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'cat-10-nov-2024-p1','subjectId':'cat','grade':10,'year':2024,'examType':'November','paperNumber':1,'title':'CAT P1','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
  {'id':'cat-10-nov-2024-p2','subjectId':'cat','grade':10,'year':2024,'examType':'November','paperNumber':2,'title':'CAT P2','curriculum':'CAPS','sourceName':'Department of Education','fileType':'pdf','duration':'3 hours','marks':150,'tags':[],'sourceUrl':'https://www.education.gov.za'},
]
existing_ids = {p['id'] for p in catalog['papers']}
added = []
for p in NEW_PAPERS:
  if p['id'] in existing_ids:
    continue
  catalog['papers'].append(p)
  added.append(p['id'])
KNOWN_RESOURCES = {
  'history': [
    {'id':'history-siyavula-12','type':'textbook','title':'Siyavula History Grade 12','source':'siyavula','url':'https://www.siyavula.com/read/za/history/grade-12','description':'Free South African CAPS-aligned History Grade 12 textbook','gradeRelevance':['12'],'subjectIds':['history']},
    {'id':'history-siyavula-11','type':'textbook','title':'Siyavula History Grade 11','source':'siyavula','url':'https://www.siyavula.com/read/za/history/grade-11','description':'Free South African CAPS-aligned History Grade 11 textbook','gradeRelevance':['11'],'subjectIds':['history']},
    {'id':'history-siyavula-10','type':'textbook','title':'Siyavula History Grade 10','source':'siyavula','url':'https://www.siyavula.com/read/za/history/grade-10','description':'Free South African CAPS-aligned History Grade 10 textbook','gradeRelevance':['10'],'subjectIds':['history']},
    {'id':'history-mind-gap-12','type':'study-guide','title':'Mind the Gap: History Grade 12','source':'mind-the-gap','url':'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx','description':'DBE study guide with revision booklets for History Grade 12 Paper 1 and Paper 2','gradeRelevance':['12'],'subjectIds':['history']},
    {'id':'history-self-study-10-12','type':'study-guide','title':'DBE Self Study Guides: History Grade 10-12','source':'dbe','url':'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx','description':'History topic-focused revision booklets for Grades 10-12','gradeRelevance':['10','11','12'],'subjectIds':['history']},
    {'id':'history-caps-doc','type':'caps-doc','title':'History CAPS Document (FET)','source':'dbe','url':'https://www.education.gov.za/LinkClick.aspx?fileticket=F99lepqD6vs%3D&','description':'CAPS curriculum document for FET History Grades 10-12','gradeRelevance':['10','11','12'],'subjectIds':['history']},
  ],
  'cat': [
    {'id':'cat-siyavula-12','type':'textbook','title':'Siyavula Computer Applications Technology Grade 12','source':'siyavula','url':'https://www.siyavula.com/read/za/computer-applications-technology/grade-12','description':'Free CAT Grade 12 textbook with theory and practical chapters','gradeRelevance':['12'],'subjectIds':['cat']},
    {'id':'cat-siyavula-11','type':'textbook','title':'Siyavula Computer Applications Technology Grade 11','source':'siyavula','url':'https://www.siyavula.com/read/za/computer-applications-technology/grade-11','description':'Free CAT Grade 11 textbook with theory and practical chapters','gradeRelevance':['11'],'subjectIds':['cat']},
    {'id':'cat-siyavula-10','type':'textbook','title':'Siyavula Computer Applications Technology Grade 10','source':'siyavula','url':'https://www.siyavula.com/read/za/computer-applications-technology/grade-10','description':'Free CAT Grade 10 textbook with theory and practical chapters','gradeRelevance':['10'],'subjectIds':['cat']},
    {'id':'cat-self-study-10-12','type':'study-guide','title':'DBE CAT Self Study Guides','source':'dbe','url':'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx','description':'DBE self study guides for Computer Applications Technology Grades 10-12','gradeRelevance':['10','11','12'],'subjectIds':['cat']},
    {'id':'cat-caps-doc','type':'caps-doc','title':'CAT CAPS Document (FET)','source':'dbe','url':'https://www.education.gov.za/Curriculum/CurriculumAssessmentPolicyStatements(CAPS).aspx','description':'Official CAPS curriculum document for CAT Grades 10-12','gradeRelevance':['10','11','12'],'subjectIds':['cat']},
  ],
  'life-sciences': [
    {'id':'life-sci-siyavula-12','type':'textbook','title':'Siyavula Life Sciences Grade 12','source':'siyavula','url':'https://www.siyavula.com/read/za/life-sciences/grade-12','description':'Free Life Sciences Grade 12 textbook online','gradeRelevance':['12'],'subjectIds':['life-sciences']},
    {'id':'life-sci-siyavula-11','type':'textbook','title':'Siyavula Life Sciences Grade 11','source':'siyavula','url':'https://www.siyavula.com/read/za/life-sciences/grade-11','description':'Free Life Sciences Grade 11 textbook online','gradeRelevance':['11'],'subjectIds':['life-sciences']},
    {'id':'life-sci-siyavula-10','type':'textbook','title':'Siyavula Life Sciences Grade 10','source':'siyavula','url':'https://www.siyavula.com/read/za/life-sciences/grade-10','description':'Free Life Sciences Grade 10 textbook online','gradeRelevance':['10'],'subjectIds':['life-sciences']},
    {'id':'life-sci-mind-gap-12','type':'study-guide','title':'Mind the Gap: Life Sciences Grade 12','source':'mind-the-gap','url':'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx','description':'DBE self-study guide for Life Sciences Grade 12','gradeRelevance':['12'],'subjectIds':['life-sciences']},
    {'id':'life-sci-self-study-10-12','type':'study-guide','title':'DBE Self Study Guides: Life Sciences','source':'dbe','url':'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx','description':'Life Sciences topic-focused self-study guides (DNA, genetics, evolution...)','gradeRelevance':['10','11','12'],'subjectIds':['life-sciences']},
    {'id':'life-sci-caps-doc','type':'caps-doc','title':'Life Sciences CAPS Document (FET)','source':'dbe','url':'https://www.education.gov.za/Curriculum/CurriculumAssessmentPolicyStatements(CAPS).aspx','description':'Official CAPS curriculum document for Life Sciences Grades 10-12','gradeRelevance':['10','11','12'],'subjectIds':['life-sciences']},
  ],
}
if 'resources' not in catalog:
  catalog['resources'] = []
res_ids = {r['id'] for r in catalog['resources']}
for subj in ('history','cat','life-sciences'):
  for r in KNOWN_RESOURCES.get(subj, ''):
    if r['id'] in res_ids:
      continue
    catalog['resources'].append(r)
with open(catalog_path, 'w', encoding='utf-8') as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)

print('added papers:', added)
print('total papers:', len(catalog['papers']))
print('total resources:', len(catalog['resources']))
